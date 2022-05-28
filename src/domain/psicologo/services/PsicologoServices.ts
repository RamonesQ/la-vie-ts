import { viaCepApi } from "../../../infrastructure/viaCep";
import { Psicologos } from "../models/psicologos";
import bcrypt from "bcryptjs";

export class PsicologoService {

    async registerPsicologo(data: any) {
        const { senha, cep } = data;

        const newSenha = bcrypt.hashSync(senha, 10);

        const newPsicologo = await Psicologos.create({
            ...data,
            senha: newSenha,
            bairro: this.getBairro(cep),
        });
    }

    async getBairro(cep: string) {
        const fullAddress = await viaCepApi.getAddress(cep);
        return fullAddress.bairro
    }

}

