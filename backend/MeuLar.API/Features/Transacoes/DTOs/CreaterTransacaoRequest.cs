using MeuLar.API.Entities;
using System.ComponentModel.DataAnnotations;

namespace MeuLar.API.Features.Transacoes.DTOs;

public class CreateTransacaoRequest
{
    [Required]
    [MaxLength(200)]
    public string Descricao { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public decimal Valor { get; set; }

    [Required]
    public TipoTransacao Tipo { get; set; }

    [Required]
    public Guid PessoaId { get; set; }
}
