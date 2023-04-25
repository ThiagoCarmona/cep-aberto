import axios, {AxiosInstance} from 'axios';
import { CepResult, TextualOptions, State, CitiesResult } from './types/types';

export default class CepAberto {
  
  private api: AxiosInstance;

  constructor(private token: string) {
    this.token = token;
    this.api = axios.create({
      baseURL: 'http://www.cepaberto.com/api/v3',
      headers: {
        "Authorization": `Token token=${this.token}`,
      }
    });
  }

  async getCepByNumber(cep: string): Promise<CepResult | {}> {
    try{
      const { data } = await this.api.get<CepResult>(`/cep`,{
        params: {
          cep
        }
      });
      return data;
    }catch(e){
      console.error(e);
      return {};
    }
  }

  async getCepCoordinates(lat: string, lng: string): Promise<CepResult | {}> {
    try{
      const { data } = await this.api.get<CepResult>(`/nearest`,{
        params: {
          lat,
          lng
        }
      });
      return data;
    }catch(e){
      console.error(e);
      return {};
    }
  }

  async searchCep(options: TextualOptions): Promise<CepResult | {}> {
    try{
      const { data } = await this.api.get<CepResult>(`/address`,{
        params: {
          estado: options.state,
          cidade: options.city,
          bairro: options.neighborhood,
          logradouro: options.logradouro
        }
      });
      return data;
    }catch(e){
      console.error(e);
      return {};
    }
  }

  async getCitiesByState(state: State): Promise<CitiesResult[]> {
    try{
      const { data } = await this.api.get<CitiesResult[]>(`/cities`,{
        params: {
          estado: state
        }
      });
      return data;
    }catch(e){
      console.error(e);
      return [];
    }
  }
}



