export type FishTextAPIResponse = {
  status: "success" | "error";
  text: string;
  errorCode: number;
};

type QueryParameters = Partial<{
  type: "sentence" | "paragraph" | "title";
  number: number;
  format: "json";
}>;

class QueryBuilder {
  public static readonly base_url = "https://fish-text.ru/get?";

  public getURL = (parameters: QueryParameters = {}) => {
    let url = QueryBuilder.base_url;

    Object.entries(parameters).forEach(([key, value]) => {
      url += `${key}=${value}&`;
    });

    return url;
  };
}

class FishTextAPI {
  private queryBuilder = new QueryBuilder();

  public getFishText = async (
    queryParameters: QueryParameters
  ): Promise<FishTextAPIResponse> => {
    const url = this.queryBuilder.getURL(queryParameters);
    const response = await fetch(url);
    return await response.json();
  };
}

export default FishTextAPI;
