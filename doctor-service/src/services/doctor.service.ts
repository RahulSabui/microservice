import { AuthServiceClient } from "../clients/auth.service";
import { DoctorRepository } from "../repositories/doctor.repository";
import { CreateDoctorDto } from "../types/doctor.types";

export class DoctorService {
    private repository = new DoctorRepository();
     private authClient = new AuthServiceClient();
    async create(data:CreateDoctorDto){

        const user = await this.authClient.getUser(data.userId);

        if (!user) {
            throw new Error("User not found");
        }
        return this.repository.create(
            data as unknown as Parameters<DoctorRepository["create"]>[0],
        );
    }

    async getAll(){
        return this.repository.findAll();
    }

    async getById(id:number){
        return this.repository.findById(id);
    }

    async delete(id:number){
        return this.repository.delete(id);
    }

}