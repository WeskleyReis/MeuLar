using System.ComponentModel.DataAnnotations;

namespace MeuLar.API.Entities;

public class Pessoa
{
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Range(0, 120)]
    public int Idade { get; set; }

    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
}
