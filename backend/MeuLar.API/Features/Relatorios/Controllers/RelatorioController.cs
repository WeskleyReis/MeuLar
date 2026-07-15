using Microsoft.AspNetCore.Mvc;
using MeuLar.API.Features.Relatorios.DTOs;
using MeuLar.API.Features.Relatorios.Services;

namespace MeuLar.API.Features.Relatorios.Controllers;

[ApiController]
[Route("api/relatorios")]
public class RelatorioController : ControllerBase
{
    private readonly IRelatorioService _service;

    public RelatorioController(IRelatorioService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<RelatorioTotaisResponse>> GetTotais()
    {
        var relatorio = await _service.GetTotaisAsync();

        return Ok(relatorio);
    }
}
