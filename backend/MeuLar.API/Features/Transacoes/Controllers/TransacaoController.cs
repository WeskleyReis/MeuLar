using Microsoft.AspNetCore.Mvc;
using MeuLar.API.Features.Transacoes.DTOs;
using MeuLar.API.Features.Transacoes.Services;

namespace MeuLar.API.Features.Transacoes.Controller;

[ApiController]
[Route("api/transacoes")]
public class TransacaoController : ControllerBase
{
    private readonly ITransacaoService _service;

    public TransacaoController(ITransacaoService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<TransacaoResponse>> Create(
        [FromBody] CreateTransacaoRequest request)
    {
        var transacao = await _service.CreateAsync(request);

        return Created(string.Empty, transacao);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransacaoResponse>>> GetAll()
    {
        var transacao = await _service.GetAllAsync();

        return Ok(transacao);
    }
}
