// src/services/journalService.ts
import { store } from "../stores/tinybaseStore";

export const TABLE_NAME = "JOURNALENTRIES";

export type EntryType = "Task" | "Event" | "Note";

export type JournalEntryStore = {
    title: string;
    type: EntryType;
    description: string;
    date: string;
};

export type JournalEntry = JournalEntryStore & { id: string };

export function addJournalEntry(entry: JournalEntry): string {
    const id = Math.random().toString(36).substr(2, 9);

    const journalEntry: JournalEntryStore = {
        title: entry.title,
        type: entry.type,
        description: entry.description,
        date: entry.date,
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
