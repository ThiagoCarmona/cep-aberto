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
const index_1 = __importDefault(require("../src/index"));
describe('CepAberto', () => {
    const token = 'd6b7452278644d7bd27c44642e432f96';
    const cepAberto = new index_1.default(token);
    describe('getCepByNumber', () => {
        it('should return the CEP information', () => __awaiter(void 0, void 0, void 0, function* () {
            const cep = '01001000';
            const result = yield cepAberto.getCepByNumber(cep);
            expect(result).toHaveProperty('cep', cep);
        }));
        it('should return an empty object if the CEP is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const cep = '00000000';
            const result = yield cepAberto.getCepByNumber(cep);
            expect(result).toEqual({});
        }));
    });
    //await new Promise(resolve => setTimeout(resolve, 2000));
    describe('getCepCoordinates', () => {
        it('should return the CEP information', () => __awaiter(void 0, void 0, void 0, function* () {
            const lat = '-23.5489';
            const lng = '-46.6388';
            const result = yield cepAberto.getCepCoordinates(lat, lng);
            //check if has key in object
            expect(result).toHaveProperty('cep');
        }));
        it('should return CEP from nearest coordinate to 0,0', () => __awaiter(void 0, void 0, void 0, function* () {
            const lat = '0';
            const lng = '0';
            const result = yield cepAberto.getCepCoordinates(lat, lng);
            expect(result).toHaveProperty('latitude', "0.0");
            expect(result).toHaveProperty('longitude', "0.0");
        }));
    });
    describe('searchCep', () => {
        it('should return the CEP information', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = {
                state: 'SP',
                city: 'São Paulo',
                neighborhood: 'Sé',
                logradouro: 'Praça da Sé'
            };
            const result = yield cepAberto.searchCep(options);
            expect(result).toHaveProperty('cep', '01001000');
        }));
        it('should return an empty object if the CEP is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = {
                state: 'DF',
                city: 'Little Whinging',
                neighborhood: 'Surrey',
                logradouro: 'Rua dos Alfeneiros, nº 4'
            };
            const result = yield cepAberto.searchCep(options);
            expect(result).toHaveProperty("message");
        }));
    });
    describe('getCitiesByState', () => {
        it('should return the cities of the state', () => __awaiter(void 0, void 0, void 0, function* () {
            const state = 'SP';
            const result = yield cepAberto.getCitiesByState(state);
            expect(result).toContainEqual({ nome: 'São Paulo' });
        }));
        it('should return an empty array if the state is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            //@ts-ignore
            const state = 'XX';
            const result = yield cepAberto.getCitiesByState(state);
            expect(result).toEqual([]);
        }));
    });
    describe("updateCepbyNumber", () => {
        it("should update the CEP information", () => __awaiter(void 0, void 0, void 0, function* () {
            const ceps = ['32371380', '41400120', '36420000'];
            const result = yield cepAberto.updateCepbyNumber(ceps);
            expect(result).toHaveProperty('cep', ceps[0]);
        }));
    });
});
