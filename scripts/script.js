"use strict";
import * as gemini from "./gemini.js";
const taskKeyPrefix = "task-";

var tasks = {};

/* Main logic */
function main() {
    tasks = getAllTasks(taskKeyPrefix);
    initTaskList();

    const submitButton = document.getElementById("add-task");
    submitButton.addEventListener("click", handleSubmitTask);
    const storyBtn = document.getElementById("generate-story");
    storyBtn.addEventListener("click", handleStoryRequest);
}

/**
 * Add a new task to localStorage
 * @param {string} task
 * @param {string} key
 */
function newTask(task, key = taskKeyPrefix + crypto.randomUUID()) {
    console.log(key);
    localStorage.setItem(key, task);
    tasks[key] = task;
    return key;
}

/**
 * Get a task as string
 * @param {string} key - the full key with prefix and number
 * @returns {string} the task as string
 */
function getTask(key) {
    var task;
    task = localStorage.getItem(key);
    return task;
}

/**
 * Clear the local storage.
 */
function clearLocalStorage() {
    localStorage.clear();
    tasks = {};
}

/**
 * Get all tasks in an object as multiple strings.
 * @param {string} prefix - the prefix of the localStorage keys
 * @return {object} all tasks in an object
 */
function getAllTasks(prefix) {
    const allTasks = {};
    for (let i in localStorage) {
        if (i.startsWith(prefix)) {
            allTasks[i] = localStorage.getItem(i);
        }
    }
    return allTasks;
}

/**
 *Initializes the task list
 */
function initTaskList() {
    console.log(tasks);
    for (const key in tasks) {
        console.log(key);
        const deleteBtn = newTaskElement(tasks[key], key);
        const taskList = document.getElementById("task-list");
        const newTaskEl = taskList.lastElementChild;
        deleteBtn.addEventListener("click", function () {
            console.log("removing", key);
            newTaskEl.remove();
            removeTask(key);
        });
    }
}

/**
 * Handles the Submit Task Button Click
 */
function handleSubmitTask() {
    const task = document.getElementById("new-task");
    const taskText = task.value;
    const key = newTask(taskText);
    const deleteBtn = newTaskElement(taskText, key);

    const taskList = document.getElementById("task-list");
    const newTaskEl = taskList.lastElementChild;
    deleteBtn.addEventListener("click", function () {
        console.log("removing", key);
        newTaskEl.remove();
        removeTask(key);
    });
}

/**
 * Creates a new HTML element for a task
 * @param {string} text
 */
function newTaskElement(text, key) {
    const taskExample = document.getElementById("example-task");
    const clonedTask = taskExample.cloneNode(true);
    clonedTask.querySelector("span").textContent = text;
    document.getElementById("task-list").appendChild(clonedTask);
    clonedTask.classList.add("flex");
    clonedTask.classList.remove("hidden");
    const deleteButton = clonedTask.querySelector("button");

    return deleteButton;
}

function removeTask(key) {
    localStorage.removeItem(key);
    delete tasks[key];
}
async function handleStoryRequest(isNovel = false) {
    const storyContent = document.getElementById("story-content");
    const loadingAnim = document.getElementById("loading-animation");
    console.log(gemini.getAPIKey());
    if (gemini.getAPIKey() == undefined) {
        const apiKey = prompt("Please enter your Gemini API key:");
        if (apiKey) {
            gemini.setAPIKey(apiKey);
        }
        // gemini.listModels().then((models) => {
        //     console.log("Available Gemini Models:", models);
        // });
    }
    console.log("Calling GEMINI");
    var aiPrompt =
        "Generate a creative story that links all of the tasks mentioned below in a fun way, so the user has some fun doing them. Keep it very short and at a readable size, so people dont get bored. Talk to the user in second person, as if he is the main character of the story. Seperate every part of the story with each task with newlines. Make the story in the language of the Tasks if not specified otherwise: " +
        Object.values(tasks).join(", ");
    const themeOptional = document.getElementById("story-theme");
    if (themeOptional.value != "") {
        aiPrompt =
            aiPrompt +
            "\nHere is a basic theme you should follow for the story: " +
            themeOptional.value;
    }
    const langOptional = document.getElementById("story-lang");
    if (langOptional.value != "") {
        aiPrompt =
            aiPrompt +
            "\nUse this language: " +
            langOptional.value;
    }
    loadingAnim.classList.add("flex");
    loadingAnim.classList.remove("hidden");
    storyContent.innerText = "Generating story ...";
    try {
        var response = await gemini.callGemini(aiPrompt);
        storyContent.innerText = response;
    } catch (error) {
        storyContent.innerText =
            "An error occurred while generating the story.";
        console.error(error);
    }
    loadingAnim.classList.add("hidden");
    loadingAnim.classList.remove("flex");
    console.log(aiPrompt);
}

document.addEventListener("DOMContentLoaded", main);
