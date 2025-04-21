// src/hooks/useTinybasePersistence.ts
import * as SQLite from "expo-sqlite";
import { useCreatePersister } from "tinybase/ui-react";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import { store } from "../stores/tinybaseStore"; // você criará isso no próximo passo

const DB_NAME = 'journal.db';

export function useTinybasePersistence() {
    useCreatePersister(
        store,
        (store) => createExpoSqlitePersister(store, SQLite.openDatabaseSync(DB_NAME)),
        [],
        //@ts-ignore
        (persister) => {
            persister.load().then(persister.startAutoSave);
        }
    );
}
