"use client";
import { useState, useEffect } from "react";
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
  const [data, setData] = useState<{
    clients: Client[];
    resources: Resource[];
    ready: boolean;
  }>({ clients: initialClients, resources: initialResources, ready: false });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({
      clients: read(clientKey, initialClients),
      resources: read(resourceKey, initialResources),
      ready: true,
    });
  }, []);

  const { clients, resources, ready } = data;

  const saveClients = (next: Client[]) => {
    setData((prev) => ({ ...prev, clients: next }));
    localStorage.setItem(clientKey, JSON.stringify(next));
  };
  const saveResources = (next: Resource[]) => {
    setData((prev) => ({ ...prev, resources: next }));
    localStorage.setItem(resourceKey, JSON.stringify(next));
  };
  return { clients, resources, ready, saveClients, saveResources };
}
