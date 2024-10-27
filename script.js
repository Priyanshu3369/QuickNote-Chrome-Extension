const noteInput = document.getElementById("note");
const saveButton = document.getElementById("save");
const notesDisplay = document.getElementById("notes");

// Load notes from storage
function loadNotes() {
    chrome.storage.local.get("notes", (data) => {
        if (data.notes) {
            notesDisplay.innerHTML = data.notes.map((note, index) =>
                `<div>${note} <button onclick="deleteNote(${index})">Delete</button></div>`
            ).join("");
        }
    });
}

// Save a new note
saveButton.addEventListener("click", () => {
    const note = noteInput.value;
    if (note) {
        chrome.storage.local.get("notes", (data) => {
            const notes = data.notes || [];
            notes.push(note);
            chrome.storage.local.set({ notes }, loadNotes);
            noteInput.value = "";
        });
    }
});

// Delete a note
window.deleteNote = function(index) {
    chrome.storage.local.get("notes", (data) => {
        const notes = data.notes || [];
        notes.splice(index, 1);
        chrome.storage.local.set({ notes }, loadNotes);
    });
};

// Initialize
loadNotes();
