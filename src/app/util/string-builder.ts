export class StringBuilder {

    private strings: string[] = [];

    private constructor(firstPiece ?: string) {
        if(firstPiece) {
            this.strings.push(firstPiece);
        }
    }

    public static init(firstPiece ?: string): StringBuilder {
        return new StringBuilder(firstPiece);
    }

    public append(piece: string): StringBuilder {
        this.strings.push(piece);
        return this;
    }

    public blankSpace(): StringBuilder {
        return this.append(" ");
    }

    public comma(): StringBuilder {
        return this.append(",");
    }

    public size(): number {
        return this.strings.length;
    }

    public build(): string {
        return this.strings.join("");
    }

}