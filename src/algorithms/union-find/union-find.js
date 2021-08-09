class UF {
    constructor(n) {
        this.id = Array.from(Array(n), (v, index) => index);
        this.size = Array.from(Array(n), () => 1);
    }
    root(p) {
        while (this.id[p] !== p) {
            // 路径压缩
            this.id[p] = this.id[this.id[p]]
            p = this.id[p]
        }
        return p
    }
    connected(p, q) {
        return this.root(p) === this.root(q)
    }
    union(p, q) {
        let i = this.root(p);
        let j = this.root(q);
        if (i === j) {
            return
        }
        // 带权重，小的集合添加到大的集合下
        if (this.size[i] < this.size[j]) {
            this.id[i] = j;
            this.size[j] = this.size[i] + this.size[j]
        } else {
            this.id[j] = i;
            this.size[i] = this.size[i] + this.size[j]
        }

    }
}

export default UF