using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Labixa.Models;
using Outsourcing.Service;
using Outsourcing.Data.Models;
using PagedList;
using Labixa.ViewModels;
using Labixa.Helpers;
using Outsourcing.Core.Common;
using Labixa.Areas.Admin.ViewModel;
using Outsourcing.Core.Framework.Controllers;
using AutoMapper;
using Microsoft.Ajax.Utilities;
using System.Net.Mail;
using System.Net;
using static log4net.Appender.RollingFileAppender;

namespace Labixa.Controllers
{

    public class HomeController : BaseHomeController
    {
        private readonly IProductService _productService;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IBlogService _blogService;
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly IWebsiteAttributeService _websiteAttributeService;
        private readonly IStaffService _staffService;
        private readonly IProductAttributeMappingService _productAttributeMappingService;
        private readonly IProductRelationshipService _productRelationshipService;

        public NetworkCredential Credentials { get; private set; }
        public bool EnableSsl { get; private set; }
        public string From { get; private set; }
        public string skype { get; private set; }
        public string Description { get; private set; }
        public string Name { get; private set; }

        //private readonly I ;
        // log4net.ILog logger = log4net.LogManager.GetLogger(typeof(HomeController));  //Declaring Log4Net

        public HomeController(IProductService productService, IBlogService blogService,
            IWebsiteAttributeService websiteAttributeService, IBlogCategoryService blogCategoryService,
            IStaffService staffService, IProductAttributeMappingService productAttributeMappingService,
            IProductRelationshipService productRelationshipService, IProductCategoryService productcategoryService)
        {
            Log.Info("sssshahaha");
            this._productService = productService;
            this._blogService = blogService;
            this._websiteAttributeService = websiteAttributeService;
            this._blogCategoryService = blogCategoryService;
            this._staffService = staffService;
            this._productAttributeMappingService = productAttributeMappingService;
            this._productRelationshipService = productRelationshipService;
            this._productcategoryService = productcategoryService;
        }
        public ActionResult HomeCommon()
        {
            return PartialView("_commonPartial");
        }
        [OutputCache(Duration = 100000)]
        public ActionResult Index(string slug)
        {
            Log.Error("hahaha");
            ViewBag.ReturnUrl = "home";
            ViewBag.Slug = slug;
            //var model = _productService.GetAllProducts().OrderByDescending(x => x.DateCreated);
            var model = _productService.GetProductBySlug("welcome-to-datadesign-vietnam");
            var category = _productcategoryService.GetProductCategoriesHome().Where(p => p.Deleted == false).ToList();
            var products = _productService.GetAllProducts().Where(p => p.Deleted == false);
            category.ForEach(x =>
            {
                x.Products = products.Where(c => x.Id == c.ProductCategoryId).ToList();
            });
            //var listBlog = _blogService.GetBlogs();
            var listBlog = _blogService.GetBlogByUrlName("3d-unlimited-potential");
            if (listBlog != null)//listBlog != null && listBlog.Count() >= 0
            {

                //var blog1 = listBlog.FirstOrDefault();
                //var blog2 = listBlog.LastOrDefault();
                //var blogimages = _;
                var blog1 = _blogService.GetBlogByUrlName("welcome-to-datadesign-vietnam");
                var blog2 = _blogService.GetBlogByUrlName("3d-unlimited-potential");
                var blogall = _blogService.GetBlogs().Where(p => p.BlogCategoryId != 15).OrderByDescending(p => p.DateCreated).Take(5).ToList();
                var blogrecruitment = _blogService.GetBlogs().Where(p => p.BlogCategoryId == 15).OrderByDescending(p => p.DateCreated).Take(4).ToList();
                ViewData["blog1"] = blog1;
                ViewData["blog2"] = blog2;
                ViewData["blogall"] = blogall;
                ViewData["blogrecruitment"] = blogrecruitment;
            }
            ViewData["category"] = category;
            return View(model);
        }
        public ActionResult SolutionPage()
        {
            ViewBag.ReturnUrl = "solutionPage";
            var model = _blogService.GetBlogByUrlName("solution-page");
            return View("SolutionPage", model);
        }
        public ActionResult Banner()
        {
            var model = _websiteAttributeService.GetWebsiteAttributes().Where(p => p.Type.Equals("Banner")).ToList();
            return PartialView("_BannerHome", model);
        }
        public ActionResult About()
        {

            return View();
        }


        #region
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult getHeader()
        {
            var websiteAttribute = _websiteAttributeService.GetWebsiteAttributes().Where(p => p.Type.ToLower().Equals("social")).ToList();
            ViewBag.social = websiteAttribute;
            var list = _productcategoryService.GetProductCategories();
            return PartialView("_Header", list);
        }
        public ActionResult getFooter()
        {
            var websiteAttribute = _websiteAttributeService.GetWebsiteAttributes().Where(p => p.Type.ToLower().Equals("social")).ToList();
            ViewBag.social = websiteAttribute;
            return PartialView("_Footer");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult about_us()
        {
            return View();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult Products()
        {

            return View();
        }
        public ActionResult DetailProduct()
        {
            return View();
        }
        public PartialViewResult GetBlog()
        {
            var model = _blogService.GetBlogs().OrderByDescending(p => p.DateCreated).Take(4).ToList();
            return PartialView("_Blog", model);
        }
        public ActionResult PolicyBuy()
        {
            var model = _blogService.GetBlogByUrlName("chinh-sach-mua-hang");
            return View(model);
        }
        public ActionResult PolicyReturn()
        {
            var model = _blogService.GetBlogByUrlName("chinh-sach-doi-tra");
            return View(model);
        }
        public ActionResult SizeTable()
        {
            var model = _blogService.GetBlogByUrlName("bang-size");
            return View(model);
        }
        #endregion

        #region[Multi Language]

        public ActionResult SetCulture(string slug, string returnUrl = "")
        {
            //SetCultu(slug);
            //return RedirectToAction("Index", "Home");
            slug = CultureHelper.GetImplementedCulture(slug);
            HttpCookie cookie = Request.Cookies["_culture"];
            if (slug == null)
            {
                slug = ViewBag.cookiValues;
            }
            if (cookie != null)
            {
                cookie.Value = slug;
            }
            else
            {
                cookie = new HttpCookie("_culture")
                {
                    Value = slug,
                    Expires = DateTime.Now.AddYears(1)
                };
            }
            Response.Cookies.Add(cookie);
            if (returnUrl.Equals(""))
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                if (returnUrl.Contains("/"))
                {
                    if (returnUrl.Split('/')[0] == "")
                        return Redirect(returnUrl);
                    return RedirectToRoute(returnUrl.Split('/')[0], new { slug = returnUrl.Split('/')[1] });
                }
                //returnUrl = returnUrl.Replace("?blog=", string.Empty);
                //returnUrl = returnUrl.Replace("blog-list", "blog-list/");
                return Redirect(returnUrl);
            }
        }
        #endregion
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult SendMessage(StaffFormModel obj)
        {
            //obj.Phone = "09090909090";
            if (ModelState.IsValid)
            {
                Staff item = Mapper.Map<StaffFormModel, Staff>(obj);
                _staffService.CreateStaff(item);
            }
            var mail = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("datadesginvn@gmail.com", "nghia@98"),
                EnableSsl = true
            };
            var message = new MailMessage();
            message = new MailMessage("datadesginvn@gmail.com", "sales-ddv@datadesign.vn", "[Datadesign VietNam] Contact Website: http://datadesign.vn", "User Name: " + obj.Name + "<br/>" + "Email: " + obj.Skype + "<br/>" + "Title: " + obj.Yahoo + "<br/>" + "Description: " + obj.Description);
            //message = new MailMessage("xxxx@gmail.com",
            //    "yyyy@gmail.com", "Message from PSSP System",
            //    "This email sent by the PSSP system<br />" +
            //    "<b>this is bold text!</b>"); 

            message.IsBodyHtml = true;
            //var message = new MailMessage();
            //message.From = new MailAddress("datadesginvn@gmail.com");
            ////message.ReplyToList.Add(obj.Skype);
            //message.ReplyToList.Add(obj.Skype);
            //message.To.Add(new MailAddress("nghiiatran1998@gmail.com"));
            //message.Subject = obj.Skype;
            //message.Body = "Message: " + obj.Description;

            //send mail
            mail.Send(message);


            return RedirectToAction("Index", "Home");
        }
        [HttpPost]
        public ActionResult Contact(string name, string email, string company, string message)
        {
            Staff staff = new Staff
            {
                Name = name,
                Yahoo = email,
                Rename = company,
                Description = message
            };
            _staffService.CreateStaff(staff);
            return RedirectToAction("Index", "Home");
        }
        public ActionResult GetPartner()
        {
            var listLogo = _websiteAttributeService.GetWebsiteAttributes().Where(p => p.Type.Equals("Logo")).ToList();
            return PartialView("_LogoListHome",listLogo);
        }
        public ActionResult Subscribe(FormCollection formSubcribe)
        {
            var accSub = formSubcribe["Subcribe"];
            if (accSub=="")
            {
                /*accSub = "N/A";*/
                return RedirectToAction("Index", "Home");
            }
            Staff staff = new Staff
            {
                skype = accSub,
                Image = DateTime.Now.ToString(),
                Rename = Request.UserHostAddress
            };
            var testExist = _staffService.GetStaffs().Where(p => p.skype==(accSub.ToString()));
            if (testExist != null && testExist.Any())
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                _staffService.CreateStaff(staff);
                return RedirectToAction("Index", "Home");
            }
        }

        public ActionResult UnSubscribe(FormCollection formSubcribe)
        {
            var accSub = formSubcribe["Subcribe"];
            var testExist = _staffService.GetStaffs().Where(p => p.skype == (accSub));
            Staff staff = new Staff();
            if (testExist != null && testExist.Any())
            {
                staff = testExist.First();
                staff.Deleted = true;


                _staffService.EditStaff(staff);
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }


        }
        //public ActionResult SolutionPage()
        //{

        //    return View();
        //}
        //[HttpPost]
        //public void SendMail(HomeController model)
        //{
        //    var mail = new SmtpClient("smtp.gmail.com")
        //    {
        //        Credentials = new NetworkCredential("nghiiatran1998@gmail.com", "nghiatraan98@"),
        //        EnableSsl = true
        //    };
        //    //var mailAdmin = "sales-ddv@datadesign.vn";
        //    //create mail
        //    var message = new MailMessage();
        //    message.From = new MailAddress(model.skype);
        //    message.ReplyToList.Add(model.skype);
        //    message.To.Add(new MailAddress("nghiarainboo@outlook.com"));
        //    message.Subject = model.Name;
        //    message.Body = model.Description;

        //    //send mail
        //    mail.Send(message);
        //    //return RedirectToAction("Index", "Home");
        //}
    }
}
