async function deleteItem(type, id) {
    const response = await fetch(`/${type}/${id}`, { method: 'DELETE' });
    if (response.ok) {
        document.getElementById(`${type}-${id}`).remove();
    }
}

async function updateItem(type, id) {
    const newData = prompt(`Enter new data for ${type} ${id}:`);
    if (newData) {
        const response = await fetch(`/${type}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newData })
        });
        if (response.ok) {
            const updatedItem = await response.json();
            document.querySelector(`#${type}-${id} .content`).innerText = updatedItem.content;
        }
    }
}
