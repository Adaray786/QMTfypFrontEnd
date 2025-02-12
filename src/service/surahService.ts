interface SurahProgress {
    surahId: number;
    memorized: boolean;
}


export default class SurahService {
    
    /**
     * Fetch all Surahs from the backend.
     */
    async getAllSurahs(): Promise<any[]> {
        try {
            const response = await fetch(process.env.BASE_URL + `api/surahs`);
            if (!response.ok) throw new Error("Failed to fetch Surahs");
            return await response.json();
        } catch (error) {
            console.error("Error fetching Surahs:", error);
            return [];
        }
    }

    /**
     * Fetch Surah memorization progress for a specific user.
     */
    async getSurahProgress(userId: number): Promise<Set<number>> {
        try {
            const response = await fetch(process.env.BASE_URL + `/api/surahProgress/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch progress");
            
            const progressData: SurahProgress[] = await response.json(); // 👈 Type added

            return new Set(progressData
                .filter((surah: SurahProgress) => surah.memorized) // 👈 Type annotation added
                .map((surah: SurahProgress) => surah.surahId)
            );
        } catch (error) {
            console.error("Error fetching Surah progress:", error);
            return new Set();
        }
    }
}
