import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}
type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState({ ...state, loading: true });
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().catch(() => {}))
      .then((json) => setState({ ...state, data: json }))
      .catch((error) => setState({ ...state, error }))
      .finally(() => setState({ ...state, loading: false }));
  }
  return [mutation, state];
}
