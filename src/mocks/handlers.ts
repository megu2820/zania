import { HttpResponse, http, delay } from "msw";
import { Document } from "../types";
import { setupWorker } from "msw/browser";

const localStorageKey = "documents";

const intialData = [
  { "type": "bank-draft", "title": "Bank Draft", "position": 0 , "id": "1"},
  { "type": "bill-of-lading", "title": "Bill of Lading", "position": 1, "id": "2"},
  { "type": "invoice", "title": "Invoice", "position": 2, "id": "3" },
  { "type": "bank-draft-2", "title": "Bank Draft 2", "position": 3, "id": "4" },
  { "type": "bill-of-lading-2", "title": "Bill of Lading 2", "position": 4, "id": "5" }
]


const data = localStorage.getItem(localStorageKey);
if (!data) {
  localStorage.setItem(localStorageKey, JSON.stringify(intialData));
}

export const handlers = [
  http.all("*", async () => {
    await delay(1000);
  }),

  http.get<{}, {}, { data: Document[] }, "/api/documents">(
    "/api/documents",
    () => {
      const data = JSON.parse(localStorage.getItem(localStorageKey) || "[]");;
      return HttpResponse.json({ data: data}, {
        status: 200,
        statusText: "Fetched documents successfully",
      });
    }
  ),

  http.post<{}, { documents: Document[] }, undefined, "/api/documents">(
    "/api/documents",
    async ({ request }) => {
      const newData = await request.json();
      localStorage.setItem(localStorageKey, JSON.stringify(newData));
      return HttpResponse.json(newData, {
        status: 201,
        statusText: "Updated documents successfully",
      });
    }
  ),
];

export const worker = setupWorker(...handlers);