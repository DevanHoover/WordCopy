





// Ai below for testing purposes
let notesFolder = null; // Store the selected folder handle

async function chooseFolder() {
    try {
        notesFolder = await window.showDirectoryPicker(); // User selects a folder
        alert("Notes folder selected!");
    } catch (error) {
        console.error("Folder selection failed", error);
    }
}

async function saveNote(format) {
    if (!notesFolder) {
        alert("Please select a folder first!");
        return;
    }

    let content = format === 'txt' ? quill.getText() : quill.root.innerHTML;
    if (!content.trim()) {
        alert("Note is empty!");
        return;
    }

    try {
        let fileName = prompt("Enter file name (without extension):");
        if (!fileName) return;

        const fileHandle = await notesFolder.getFileHandle(`${fileName}.${format}`, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();

        alert(`Note saved in ${notesFolder.name} folder as ${fileName}.${format}!`);
    } catch (error) {
        console.error("Save failed", error);
    }
}

// Initialize Quill editor
var quill = new Quill('#editor-container', {
    theme: 'snow',
    placeholder: 'Start typing your notes here...'
});