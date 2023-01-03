import * as apiConfig from "./apiConfig";

type CredentialsType = {
  email: string;
  password: string;
};
type TorneioCreateType = {
  title: string;
};
type PlayerCreateType = {
  name: string;
  category: string;
};
type PlayerDeleteType = {
  key: string;
};
type RaceType = {
  winner: string;
  key: string;
};

export const login = async ({ email, password }: CredentialsType) => {
  const dataSend = {
    email,
    password,
  };
  try {
    const response = await apiConfig.sendWithAxios("token", "POST", dataSend);
    return response.data;
  } catch {
    throw new Error("erro ao logar");
  }
};

export const getTorunaments = async () => {
  const response = await apiConfig.sendWithAxios(
    "tournaments",
    "GET"
  );
  return response.data;
};
export const getTorunament = async (id: string) => {
  try {
    const response = await apiConfig.sendWithAxios(
      `tournaments/${id}`,
      "GET"
    );
    return response.data;
  } catch {
    throw new Error("erro ao obter torneios");
  }
};

export const postTorunaments = async (dataTournament: TorneioCreateType) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "tournaments",
      "POST",
      dataTournament
    );
    return response.data;
  } catch {
    throw new Error("erro ao criar torneio");
  }
};
export const deletTorunaments = async (id: string) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "r2mvt1f6wludndkivtq06upimbz97aah",
      "DELETE",
      { key: id },
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao deletar torneio");
  }
};
export const postPlayer = async (dataPlayer: PlayerCreateType, id: string) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "92lifkj4demkm16tk5jc3vaj78pdmawx",
      "POST",
      { player: dataPlayer },
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao criar jogador");
  }
};
export const putPlayer = async (dataPlayer: PlayerCreateType, id: string) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "92lifkj4demkm16tk5jc3vaj78pdmawx",
      "PUT",
      { player: dataPlayer },
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao atualizar jogador");
  }
};
export const deletePlayer = async (
  dataPlayer: PlayerDeleteType,
  id: string
) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "92lifkj4demkm16tk5jc3vaj78pdmawx?player=" + dataPlayer.key,
      "DELETE",
      null,
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao deletar jogador");
  }
};
export const getTournamentKeys = async (id: string, category: string) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "xkqbcdm7if1d7c3r9r75j1rjsc1wdxb9?category=" + category,
      "GET",
      null,
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao carregar chaves");
  }
};
export const createTournamentKeys = async (id: string, category: string) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "xkqbcdm7if1d7c3r9r75j1rjsc1wdxb9",
      "POST",
      { category },
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao carregar chaves");
  }
};
export const updateTournamentKeys = async (id: string, category: string) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "xkqbcdm7if1d7c3r9r75j1rjsc1wdxb9",
      "PUT",
      { category },
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao carregar chaves");
  }
};

export const getRace = async (race: string, id: string) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "eog0rhpyfy4a7kefggoyrvc5l2rh2nty?key=" + race,
      "GET",
      null,
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao carregar corrida");
  }
};
export const getRacer = async (racer: string, id: string) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "92lifkj4demkm16tk5jc3vaj78pdmawx?key=" + racer,
      "GET",
      null,
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao carregar corrida");
  }
};

export const putPlayers = async (
  dataPlayer: PlayerCreateType[],
  id: string
) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "92lifkj4demkm16tk5jc3vaj78pdmawx",
      "PUT",
      { players: dataPlayer },
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao atualizar jogador");
  }
};
export const putRace = async (race: RaceType, id: string) => {
  try {
    const response = await apiConfig.sendWithAxios(
      "eog0rhpyfy4a7kefggoyrvc5l2rh2nty",
      "PUT",
      race,
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao atualizar corrida");
  }
};
