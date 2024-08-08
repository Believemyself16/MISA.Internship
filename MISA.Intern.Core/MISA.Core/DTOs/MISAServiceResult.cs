using System.Net;

namespace MISA.Core.DTOs
{
    public class MISAServiceResult
    {
        public bool Success { get; set; }
        public object Data { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
        public static MISAServiceResult CreateSuccessResult(object data, HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            return new MISAServiceResult
            {
                Success = true,
                Data = data,
                StatusCode = statusCode
            };
        }

        public static MISAServiceResult CreateErrorResult(List<string> errors, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        {
            return new MISAServiceResult
            {
                Success = false,
                Errors = errors,
                StatusCode = statusCode
            };
        }
    }
}
