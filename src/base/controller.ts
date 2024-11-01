import { EntityTarget, ObjectLiteral, DeepPartial } from "typeorm";
import { AppDataSource } from "../data-source";


export class Controller{

    /**
     * Search data in the database by params (conditions) and relations sends.
     * @param {EntityTarget<ObjectLiteral>} entity - The entity from which to retrieve the data from the database.
     * @param {Object} findData 
     * @returns {Promise<ObjectLiteral>} Returns the data of the entity stored in the database.
     */
    async get(entity:EntityTarget<ObjectLiteral>, where:any = {}, relations:ObjectLiteral = {}, loadRelationIds:boolean = true): Promise<any>{
        return await AppDataSource.manager.find(entity, {where, relations, loadRelationIds});
    }

    /**
     * Searches for an entity in the database by a specified id and returns the results as an object with the properties found in the database.
     * @param {EntityTarget<ObjectLiteral>} entity - The entity from which to retrieve the data from the database.
     * @param {Number} id - The id of the entity to retrieve from the database.
     * @param {Object} [relationData]
     * @returns {Promise<any>} - Returns the data from the database with the specified id of an entity.
     */
    async getById(entity:EntityTarget<ObjectLiteral>, id:Number, relationData:ObjectLiteral = {}, loadRelationIds:boolean = true): Promise<any>{
        return await AppDataSource.manager.findOne(entity, { where: { id:id }, relations: relationData, loadRelationIds: loadRelationIds });
    }

    /**
     * Updates and creates data of an entity in the database.
     * @param {EntityTarget<ObjectLiteral>} entity - The entity to which the data is stored.
     * @param {DeepPartial<ObjectLiteral>} data - The data to be stored in the entity.
     * @returns {Promise<ObjectLiteral>} Returns the data of the entity stored in the database.
     */
    async upsert(entity:EntityTarget<ObjectLiteral>, data:DeepPartial<ObjectLiteral>):Promise<ObjectLiteral>{
        return await AppDataSource.manager.save(entity, data);
    }
}