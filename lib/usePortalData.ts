"use client";
import { useState } from "react";
import {
  Client,
  initialClients,
  initialResources,
  Resource,
} from "@/lib/clients";
const clientKey = "cutroom-clients";
const resourceKey = "cutroom-resources";
function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
export function usePortalData() {
  const [clients, setClients] = useState<Client[]>(() =>
    typeof window === "undefined"
      ? initialClients
      : read(clientKey, initialClients),
  );
  const [resources, setResources] = useState<Resource[]>(() =>
    typeof window === "undefined"
      ? initialResources
      : read(resourceKey, initialResources),
  );
  const saveClients = (next: Client[]) => {
    setClients(next);
    localStorage.setItem(clientKey, JSON.stringify(next));
  };
  const saveResources = (next: Resource[]) => {
    setResources(next);
    localStorage.setItem(resourceKey, JSON.stringify(next));
  };
  return { clients, resources, ready: true, saveClients, saveResources };
}
