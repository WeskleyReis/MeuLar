using MeuLar.API.Features.Relatorios.DTOs;

namespace MeuLar.API.Features.Relatorios.Services;

public interface IRelatorioService
{
    Task<RelatorioTotaisResponse> GetTotaisAsync();
}
