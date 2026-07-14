using Microsoft.AspNetCore.Mvc;
using MeuLar.API.Features.Pessoas.DTOs;
using MeuLar.API.Features.Pessoas.Services;

namespace MeuLar.API.Features.Pessoas.Controllers;

[ApiController]
[Route("api/pessoas")]
public class PessoaController : ControllerBase
{
    private readonly IPessoaService _service;

    public PessoaController(IPessoaService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<PessoaResponse>> Create(
        [FromBody] CreatePessoaRequest request)
    {
        var pessoa = await _service.CreateAsync(request);

        return Created(string.Empty, pessoa);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PessoaResponse>>> GetAll(
        CancellationToken cancellationToken)
    {
        var pessoas = await _service.GetAllAsync();

        return Ok(pessoas);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);

        return NoContent();
    }
}
