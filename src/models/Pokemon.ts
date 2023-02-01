export class Pokemons{
    constructor(
        private id: string,
        private name: string,
        private type: string,
        private hp: number,
        private attack: number,
        private defense: number
    ){}

    public getId(): string {
        return this.id
    }
    public setId(value: string): void{
        this.id = value
    }

    public getName(): string {
        return this.name
    }
    public setName(value: string): void{
        this.name = value
    }

    public getType(): string {
        return this.type
    }
    public setType(value: string): void{
        this.type = value
    }

    public getHp(): number {
        return this.hp
    }
    public setHp(value: number): void{
        this.hp = value
    }

    public getAttack(): number {
        return this.attack
    }
    public setAttack(value: number): void{
        this.attack = value
    }

    public getDefense(): number {
        return this.defense
    }
    public setDefense(value: number): void{
        this.defense = value
    }
}