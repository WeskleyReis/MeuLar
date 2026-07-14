using MeuLar.API.Features.Pessoas.DTOs;

namespace MeuLar.API.Features.Pessoas.Services;

public interface IPessoaService
{
    Task<PessoaResponse> CreateAsync(CreatePessoaRequest request);

    Task<IEnumerable<PessoaResponse>> GetAllAsync();

    Task DeleteAsync(Guid id);
}
