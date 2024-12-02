import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userStats } from "../../api";
import { IJournalStat, IMemoryStat } from "../../utils";

interface UserStats {
  memoryStats: IMemoryStat;
  journalStats: IJournalStat;
}

interface UserStatsState {
  stats: UserStats | {};
  loading: boolean;
  error: string | null;
}

export const fetchUserStat = createAsyncThunk<UserStats, void>(
  "userStats",
  async () => {
    const response = await userStats();
    return response?.data;
  }
);

const userStatsSlice = createSlice({
  name: "userStats",
  initialState: {
    stats: {},
    loading: false,
    error: null as string | null,
  } as UserStatsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStat.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserStat.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserStat.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export default userStatsSlice.reducer;
