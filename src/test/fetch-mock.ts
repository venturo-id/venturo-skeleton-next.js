import { vi } from 'vitest';

// ----------------------------------------------------------------------
// Helper test: ganti global fetch (dipakai ky di dalam apiFetch) dengan
// respons berurutan, supaya lapisan src/lib/api diuji tanpa backend.

type MockReply = Response | Error | Promise<never>;

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function stubFetch(...replies: MockReply[]) {
  const fetchMock = vi.fn<typeof fetch>();

  replies.forEach((reply) => {
    if (reply instanceof Response) {
      fetchMock.mockResolvedValueOnce(reply);
    } else if (reply instanceof Error) {
      fetchMock.mockRejectedValueOnce(reply);
    } else {
      fetchMock.mockReturnValueOnce(reply);
    }
  });
  vi.stubGlobal('fetch', fetchMock);

  return fetchMock;
}

/** The Request ky sent on the given call (ky always passes a Request). */
export function sentRequest(fetchMock: ReturnType<typeof stubFetch>, call = 0): Request {
  const input = fetchMock.mock.calls[call]?.[0];

  if (!(input instanceof Request)) {
    throw new Error(`fetch call ${call} was not made with a Request`);
  }

  return input;
}
