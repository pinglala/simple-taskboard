<script lang="ts">
    import type { List, ListTask } from "../../shared/models/interface";
    import Task from "./task.svelte";

    let name = "";
    let filter = "";
    let numberOfColumns;
    let filteredList;
    let list: List[] = [];
 
    $: numberOfColumns &&
        numberOfColumns.style.setProperty(
            "--number-of-columns",
            list.length.toString()
        );

    function addList(name: string) {
        list = [
            ...list,
            {
                id: list.length + 1,
                name: name ? name : "New list",
                tasks: [],
            },
        ];
        resetForm();
    }

    function removeList(id: number) {
        list = list.filter((x) => x.id !== id);
    }

    function resetForm() {
        name = "";
    }

    function filterList(filter: string) {
        filteredList = list;
        filteredList = filteredList.map((obj: List) => ({
            ...obj,
            tasks: obj.tasks.filter((el: ListTask) =>
                el.name.toLowerCase().includes(filter.toLowerCase())
            ),
        }));
    }

    function clear() {
        filteredList = null;
        filter = '';
    }
</script>
<div class={list.length > 0 ? 'form-container' : 'form-container no-filter'}>
    <form on:submit|preventDefault={() => addList(name)}>
        <input type="text" placeholder="Name" bind:value={name} />
        <button class="add" type="button" on:click={() => addList(name)}>add new list</button>
    </form>
    {#if list.length > 0}
        <form class="filter" on:submit|preventDefault={() => filterList(filter)}>
            <input type="text" placeholder="Filter" bind:value={filter} />
            {#if filteredList}
                <button class="filter" type="button" on:click={() => clear()}>clear</button>
            {/if}
            <button class="filter" type="button" on:click={() => filterList(filter)}>filter</button>
        </form>
    {/if}
</div>

<div class="list" bind:this={numberOfColumns}>
    {#each filteredList ? filteredList : list as listItem}
        <div class="list-item">
            <div class="list-item-header">
                <div>{listItem.name}</div>
                <button class="remove" type="button" on:click={() => removeList(listItem.id)} aria-label="remove list">remove</button>
            </div>
            <Task {listItem} />
        </div>
    {/each}
</div>

<style lang="scss">
    :root {
        --number-of-columns: inherit;
    }

    .form-container {
        display: flex;
        justify-content: space-between;
        margin: 0 auto 20px auto;

        &.no-filter {
            justify-content: center !important;
        }
         form {
            input {
                margin-right: 2rem;
            }

            &.filter {
                button {
                    margin-right: 10px;
                }
            }
        } 
    }
  
    .list {
        display: grid;
        grid-template-columns: repeat(var(--number-of-columns), 1fr);
        gap: 10px;

        .list-item {
            margin: 10px 0;
            background: #f0f0f0;
            padding: 15px;
            .list-item-header {
                position: relative;
                margin-bottom: 20px;
                div {
                    font-weight: 600;
                    font-size: 24px;
                }
                button {
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
        }
    }
    :global(.remove) {
        border: 1px solid #b30000;
        color: #b30000;
    }
    :global(.add) {
        border: 1px solid #006624;
        color: #006624;
    }

    @media (max-width: 768px) {
        .list {
            grid-template-columns: repeat(1, 1fr) !important;
        }

        .form-container {
            display: block;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        .list {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }

    @media (min-width: 1024px) and (max-width: 1200px) {
        .list {
            grid-template-columns: repeat(3, 1fr) !important;
        }
    }
</style>
