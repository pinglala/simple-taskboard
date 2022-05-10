<script lang="ts">
    import type { List } from "../../shared/models/interface";
    import Task from "./task.svelte";

    let name = "";
    let list: List[] = [
        {
            id: 1,
            name: "Att göra",
            tasks: [
                { id: 1, name: "Plantera potatis", description: "I krukor" },
                {
                    id: 2,
                    name: "Kratta löv",
                    description: "Framsidan av huset",
                },
                {
                    id: 3,
                    name: "Rensa ogräs",
                    description: "Framsidan av huset",
                },
            ],
        },
        {
            id: 2,
            name: "Pågående",
            tasks: [
                {
                    id: 1,
                    name: "Gräva rabatt",
                    description: "Ny rabatt i framsidan av huset",
                },
                {
                    id: 2,
                    name: "Slänga skräp",
                    description: "Saker som ska göras",
                },
            ],
        },
        {
            id: 3,
            name: "Färdig",
            tasks: [
                {
                    id: 1,
                    name: "Sortera verktyg",
                    description: "Finns nya verktyg som måste tas hand om",
                },
                {
                    id: 2,
                    name: "Rensa ogräs",
                    description: "Baksidan av huset",
                },
                { id: 3, name: "Kratta löv", description: "Baksidan av huset" },
            ],
        },
    ];
    let numberOfColumns;

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
                name: name,
                tasks: [],
            },
        ];
        reset();
    }

    function removeList(id: number) {
        list = list.filter((x) => x.id !== id);
    }

    function reset() {
        name = "";
    }
</script>

<form class="add">
    <input type="text" placeholder="Name" bind:value={name} />
    <button type="button" on:click={() => addList(name)}>Add new list</button>
</form>
<div class="list" bind:this={numberOfColumns}>
    {#each list as listItem}
        <div class="list-item">
            <div class="list-item-header">
                <div> {listItem.name} </div>
                <button type="button" on:click={() => removeList(listItem.id)} aria-label="remove list">remove</button>
            </div>
            <Task tasks={listItem.tasks} />
        </div>
    {/each}
</div>

<style lang="scss">
    :root {
        --number-of-columns: inherit;
    }
    .add {
        display: flex;
        justify-content: center;
        margin: 0 auto 20px auto;
        input {
            margin-right: 2rem;
        }
    }
    .list {
        display: grid;
        grid-template-columns: repeat(var(--number-of-columns), 1fr);
        gap: 10px;

        .list-item {
            margin: 10px;
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

    @media (max-width: 768px) {
        .list {
        grid-template-columns: repeat(1, 1fr) !important;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
        .list {
        grid-template-columns: repeat(2, 1fr) !important;
        }
    }
</style>
