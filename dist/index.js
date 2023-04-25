"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class CepAberto {
    constructor(token) {
        this.token = token;
        this.token = token;
        this.api = axios_1.default.create({
            baseURL: 'https://www.cepaberto.com/api/v3',
            headers: {
                "Authorization": `Token token=${this.token}`,
            }
        });
    }
    getCepByNumber(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.api.get(`/cep`, {
                    params: {
                        cep
                    }
                });
                return data;
            }
            catch (e) {
                console.error(e);
                return {};
            }
        });
    }
    getCepCoordinates(lat, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.api.get(`/nearest`, {
                    params: {
                        lat,
                        lng
                    }
                });
                return data;
            }
            catch (e) {
                console.error(e);
                return {};
            }
        });
    }
    searchCep(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.api.get(`/address`, {
                    params: {
                        estado: options.state,
                        cidade: options.city,
                        bairro: options.neighborhood,
                        logradouro: options.logradouro
                    }
                });
                return data;
            }
            catch (e) {
                if (axios_1.default.isAxiosError(e)) {
                    const error = e;
                    if (error.response) {
                        return { message: error.response.data.message };
                    }
                }
                return { message: "Erro desconhecido" };
            }
        });
    }
    getCitiesByState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.api.get(`/cities`, {
                    params: {
                        estado: state
                    }
                });
                return data;
            }
            catch (e) {
                console.error(e);
                return [];
            }
        });
    }
    updateCepbyNumber(ceps) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ceps.length > 100) {
                throw new Error("Max 100 ceps per request");
            }
            try {
                const { data } = yield this.api.post("/update/", {
                    ceps: ceps.join(",")
                }, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                });
                return data;
            }
            catch (e) {
                console.error(e);
                return [];
            }
        });
    }
    updateToken(token) {
        this.token = token;
        this.api.defaults.headers.Authorization = `Token token=${this.token}`;
    }
}
exports.default = CepAberto;