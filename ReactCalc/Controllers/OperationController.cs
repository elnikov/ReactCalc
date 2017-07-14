using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ReactCalc.Controllers
{
    public class OperationController : ApiController
    {
        // GET api/subtract/{num1}/{num2}
        [HttpGet]
        public double Subtract(double num1, double num2)
        {
            return num1-num2;
        }

        // GET api/addition/{num1}/{num2}
        [HttpGet]
        public double Addition(double num1, double num2)
        {
            return num1 + num2;
        }

        // GET api/multiplicate/{num1}/{num2}
        [HttpGet]
        public double Multiplicate(double num1, double num2)
        {
            return num1 * num2;
        }

        // GET api/division/{num1}/{num2}
        [HttpGet]
        public double Division(double num1, double num2)
        {
            return num1 / num2;
        }

        // GET api/square/{num1}
        [HttpGet]
        public double Square(double num1)
        {
            return num1 * num1;
        }

        // GET api/sqrt/{num1}
        [HttpGet]
        public double Sqrt(double num1)
        {
            return Math.Sqrt(num1);
        }
    }
}
