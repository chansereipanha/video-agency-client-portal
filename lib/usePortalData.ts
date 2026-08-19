"use client";
import { useState, useEffect } from "react";
import { collection, doc, getDocs, onSnapshot, setDoc, writeBatch } from "firebase/firestore";
import {
  Client,
  initialClients,
  initialResources,
  Resource,
} from "@/lib/clients";
import { db } from "@/lib/firebase";
export function usePortalData() {
  const [data, setData] = useState<{
    clients: Client[];
    resources: Resource[];
    ready: boolean;
  }>({ clients: initialClients, resources: initialResources, ready: false });

  useEffect(() => {
    if (!db) return;
    const firestore = db;
    const seed = async () => { const [clientDocs, resourceDocs] = await Promise.all([getDocs(collection(firestore, "clients")), getDocs(collection(firestore, "resources"))]); if (clientDocs.empty && resourceDocs.empty) { const batch = writeBatch(firestore); initialClients.forEach((client) => batch.set(doc(firestore, "clients", client.id), client)); initialResources.forEach((resource) => batch.set(doc(firestore, "resources", resource.id), resource)); await batch.commit(); } };
    void seed();
    const clientsUnsubscribe = onSnapshot(collection(firestore, "clients"), (snapshot) => setData((current) => ({ ...current, clients: snapshot.docs.map((item) => item.data() as Client), ready: true })));
    const resourcesUnsubscribe = onSnapshot(collection(firestore, "resources"), (snapshot) => setData((current) => ({ ...current, resources: snapshot.docs.map((item) => item.data() as Resource), ready: true })));
    return () => { clientsUnsubscribe(); resourcesUnsubscribe(); };
  }, []);

  const { clients, resources, ready } = data;

  const saveClients = (next: Client[]) => {
    setData((prev) => ({ ...prev, clients: next }));
    const firestore = db;
    if (firestore) void Promise.all(next.map((client) => setDoc(doc(firestore, "clients", client.id), client)));
  };
  const saveResources = (next: Resource[]) => {
    setData((prev) => ({ ...prev, resources: next }));
    const firestore = db;
    if (firestore) void Promise.all(next.map((resource) => setDoc(doc(firestore, "resources", resource.id), resource)));
  };
  return { clients, resources, ready, saveClients, saveResources };
}
