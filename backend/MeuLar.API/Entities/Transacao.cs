using System.ComponentModel.DataAnnotations;

namespace MeuLar.API.Entities;

public class Transacao
{
    public Guid Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Descricao { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public decimal Valor { get; set; }

    public TipoTransacao Tipo { get; set; }

    public Guid PessoaId { get; set; }

    public Pessoa Pessoa { get; set; } = null!;
}
