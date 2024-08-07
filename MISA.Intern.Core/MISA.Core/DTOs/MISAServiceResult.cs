using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.DTOs
{
    public class MISAServiceResult
    {
        public bool Success { get; set; }
        public object Data { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }
}
