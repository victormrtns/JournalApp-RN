// src/services/journalService.ts
import { store } from "../stores/tinybaseStore";

export const TABLE_NAME = "JOURNALENTRIES";

export type EntryType = "task" | "event" | "note";

export type JournalEntryStore = {
    title: string;
    type: EntryType;
    description: string;
    date: string;
};

export type JournalEntry = JournalEntryStore & { id: string };

export function addJournalEntry(): string {
    const id = Math.random().toString(36).substr(2, 9);
    const entry: JournalEntryStore = {
        title: "Exemplo de entrada",
        type: "note",
        description: "Descrição de exemplo",
        date: new Date().toISOString(),
    };

    store.setRow(TABLE_NAME, id, entry);
    return id;
}

export function getAllJournalEntries(): JournalEntry[] {
    const rowIds = store.getRowIds(TABLE_NAME);
    return rowIds.map((id) => {
        const row = store.getRow(TABLE_NAME, id) as JournalEntryStore;
        return { id, ...row };
    });
}
