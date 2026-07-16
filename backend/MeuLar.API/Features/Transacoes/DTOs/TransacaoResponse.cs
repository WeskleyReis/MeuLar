using MeuLar.API.Entities;

namespace MeuLar.API.Features.Transacoes.DTOs;

public class TransacaoResponse
{
    public Guid Id { get; set; }

    public string Descricao { get; set; } = string.Empty;

    public decimal Valor { get; set; }

    public TipoTransacao Tipo { get; set; }

    public Guid PessoaId { get; set; }

    public string NomePessoa { get; set; } = string.Empty;
}
