<script lang="ts">
    import type { ListTask } from "../../shared/models/interface";

    export let tasks: ListTask[];
    let name = "";
    let description = "";
    let selectedTask = null;

    function add() {
        reset();
        selectedTask = {
                id: tasks.length + 1,
                name: '',
                description: ''
        };

        tasks.unshift(selectedTask);
        tasks = tasks;
    }

    function remove(id: number) {
        tasks = tasks.filter((x) => x.id !== id);
    }

    function edit(index: number) {
        if (selectedTask) {
            selectedTask = null;
            tasks[index]  = {
                    id: tasks[index].id,
                    name: name,
                    description: description,
                }
        } else {
            selectedTask = tasks[index];
            name = tasks[index].name;
            description = tasks[index].description;
        }
    }

    function reset() {
        name = "";
        description = "";
    }
</script>

<div class="task">
    <button type="button" on:click={add}>Add task</button>
    <ul>
        {#each tasks as task, index}
            <li>
                <form class="add">
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
                        <button type="button" on:click={() => (selectedTask = null)}>cancel</button>
                    {:else}
                        <button type="button" on:click={() => remove(task.id)}>remove</button>
                    {/if}
                    <button type="button" on:click={() => edit(index)}>{selectedTask && selectedTask === task ? "update" : "edit"}</button>
                </div>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    .add {
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

                p {
                    max-height: 100px;
                    overflow: auto;
                }

                .action-buttons {
                    text-align: right;
                }
            }
        }
    }
</style>
