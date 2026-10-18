using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Portfolio.Api.Services;

public class TokenService(IConfiguration configuration)
{
    public (string Token, DateTime ExpiresAt) CreateToken(string username)
    {
        var key = configuration["Jwt:Key"]
            ?? throw new InvalidOperationException("Jwt:Key is not configured.");
        var issuer = configuration["Jwt:Issuer"] ?? "portfolio-api";
        var audience = configuration["Jwt:Audience"] ?? "portfolio-cms";
        var hours = int.TryParse(configuration["Jwt:ExpiresHours"], out var h) ? h : 12;

        var expires = DateTime.UtcNow.AddHours(hours);
        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer,
            audience,
            [
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, "Admin")
            ],
            expires: expires,
            signingCredentials: credentials
        );

        return (new JwtSecurityTokenHandler().WriteToken(token), expires);
    }
}
