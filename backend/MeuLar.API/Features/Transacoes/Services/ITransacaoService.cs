using MeuLar.API.Features.Transacoes.DTOs;

namespace MeuLar.API.Features.Transacoes.Services;

public interface ITransacaoService
{
    Task<TransacaoResponse> CreateAsync(CreateTransacaoRequest request);

    Task<IEnumerable<TransacaoResponse>> GetAllAsync();
}
