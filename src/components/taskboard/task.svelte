<script lang="ts">
    import type { List } from "../../shared/models/interface";

    export let listItem: List;
    const asc = "↓";
    const desc = "↑";
    let name = "";
    let description = "";
    let selectedTask = null;
    let sortBy = `${asc}${desc}`;

    function addTask() {
        resetForm();
        selectedTask = {
            id: listItem.tasks.length + 1,
            name: null,
            description: null,
        };

        listItem.tasks.unshift(selectedTask);
        listItem.tasks = listItem.tasks;
    }

    function removeTask(id: number) {
        listItem.tasks = listItem.tasks.filter((x) => x.id !== id);
    }

    function editTask(index: number) {
        if (selectedTask) {
            selectedTask = null;
            listItem.tasks[index] = {
                id: listItem.tasks[index].id,
                name: name ? name : 'Name',
                description: description ? description : 'Description',
            };
        } else {
            selectedTask = listItem.tasks[index];
            name = listItem.tasks[index].name;
            description = listItem.tasks[index].description;
        }
    }

    function cancel(index: number) {   
        if(!selectedTask.name && !selectedTask.description) {
            removeTask(index);
        }
        else {
            selectedTask = null;
        }
    }

    function sort() {
        switch (sortBy) {
            case `${asc}${desc}`:
            case desc:
                listItem.tasks.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                sortBy = asc;
                break;

            case asc:
                listItem.tasks.sort(function (a, b) {
                    return b.name.localeCompare(a.name);
                });
                sortBy = desc;
                break;
            default:
                break;
        }
        listItem.tasks = listItem.tasks;
    }

    function resetForm() {
        name = "";
        description = "";
    }
</script>

<div class="task">
    <div class="action-buttons">
        <button class="sort" type="button" on:click={sort}>sort {sortBy}</button>
        <button class="add" type="button" on:click={addTask}>add task</button>
    </div>
    <ul>
        {#each listItem.tasks as task, index}
            <li>
                <form on:submit={() => editTask(index)}>
                    {#if selectedTask === task}
                        <input
                            type="text"
                            placeholder="Name"
                            bind:value={name}
                        />
                        <textarea
                            placeholder="Description"
                            bind:value={description}
                        />
                    {:else}
                        <span class="title"><b>{task.name}</b></span>
                        <p>{task.description}</p>
                    {/if}
                </form>

                <div class="action-buttons">
                    {#if selectedTask && selectedTask === task}
                        <button type="button" on:click={() => cancel(task.id)}>cancel</button>
                    {:else}
                        <button class="remove" type="button" on:click={() => removeTask(task.id)}>remove</button>
                    {/if}
                    <button type="button" on:click={() => editTask(index)}>
                        {selectedTask && selectedTask === task ? ((selectedTask.name && selectedTask.description)? 'update' : "add" ) : "edit"}
                    </button>
                </div>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    form {
        display: grid;
    }
    .task {
        ul {
            padding: 0;
            list-style-type: none;
            li {
                min-height: 100px;

                margin-bottom: 15px;
                padding: 20px;

                text-align: left;
                border: 1px solid #595959;
                background-color: #fff;
                p {
                    max-height: 100px;
                    overflow: auto;
                }
            }
        }
    }

    .action-buttons {
        position: relative;
        text-align: right;
        .sort {
                position: absolute;
                left: 0;
            }
    }
</style>
