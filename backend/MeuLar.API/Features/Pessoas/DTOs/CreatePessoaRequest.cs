using System.ComponentModel.DataAnnotations;

namespace MeuLar.API.Features.Pessoas.DTOs;

public class CreatePessoaRequest
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Range(0, 120)]
    public int Idade { get; set; }
}
