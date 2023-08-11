class CaixaDaLanchonete {

    constructor() {
        // Defina o cardápio com os itens e seus preços
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        };

        // Defina as formas de pagamento aceitas e seus ajustes de preço
        this.formasDePagamento = {
            dinheiro: { desconto: 0.05 },
            debito: { ajuste: 0 },
            credito: { ajuste: 0.03 }
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        // Verifica se a forma de pagamento é válida
        if (!this.formasDePagamento[formaDePagamento]) {
            return 'Forma de pagamento inválida!';
        }

        let valorTotal = 0;
        let cafePresente = false; // Verifica se o café está presente
        let sanduichePresente = false; // Verifica se o sanduíche está presente

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            if (!this.cardapio[codigo]) {
                return 'Item inválido!';
            }

            // Verifica se a quantidade é válida
            if (parseInt(quantidade) <= 0) {
                return 'Quantidade inválida!';
            }

            const valorItem = this.cardapio[codigo].valor * parseInt(quantidade);
            valorTotal += valorItem;

            // Verifica se o café está presente no carrinho
            if (codigo === 'cafe') {
                cafePresente = true;
            }

            // Verifica se o sanduíche está presente no carrinho
            if (codigo === 'sanduiche') {
                sanduichePresente = true;
            }

            // Verifica se o chantily está sendo adicionado sem o café
            if (codigo === 'chantily' && !cafePresente) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            // Verifica se o queijo está sendo adicionado sem o sanduíche
            if (codigo === 'queijo' && !sanduichePresente) {
                return 'Item extra não pode ser pedido sem o principal';
            }
        }

        // Verifica se há itens no carrinho de compra
        if (valorTotal === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        // Aplica desconto ou ajuste de preço de acordo com a forma de pagamento
        const formaPagamento = this.formasDePagamento[formaDePagamento];
        if (formaPagamento.desconto) {
            valorTotal *= (1 - formaPagamento.desconto);
        } else if (formaPagamento.ajuste) {
            valorTotal *= (1 + formaPagamento.ajuste);
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
