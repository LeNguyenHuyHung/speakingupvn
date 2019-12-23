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


namespace Labixa.Controllers
{
    public class BlogListController : BaseHomeController
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

        public BlogListController(IProductService productService, IBlogService blogService,
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
        //
        // GET: /Artec3D/

        /// <summary>
        /// Index Error
        /// </summary>
        /// <returns></returns>
        /// 
        

        public ActionResult Index(int? page = 1,string ad="", string searching = "")
        {
            var blogall = _blogService.GetBlogs().Where(p => p.BlogCategoryId != 15).OrderByDescending(p => p.DateCreated).Take(5).ToList();
            ViewData["blogall"] = blogall;
            int pageNumber = (page ?? 1);
            searching = StringConvert.ConvertShortName(searching);
            int pageSize = 5;           
            ViewBag.ReturnUrl = "/tin-tuc"; /*BlogList*/
            ViewBag.ReturnUrl12 = ad;
            var x = ViewBag.ReturnUrl12;
            string[] searchTerms = searching.Split(new[] { '-' }, StringSplitOptions.RemoveEmptyEntries);
            //var model = _blogService.GetBlogs().OrderByDescending(p => p.DateCreated).Where(p => p.IsAvailable && p.BlogCategoryId != 15 && searchTerms.All(s => p.Slug.Contains(s))).ToPagedList(pageNumber, pageSize);
            var model = _blogService.GetBlogs().Where(p => p.BlogCategoryId != 15).OrderByDescending(p => p.DateCreated).ToPagedList(pageNumber, pageSize);
            //var model = _blogService.GetBlogs().Where(p => p.BlogCategoryId !=15 && p.IsAvailable || !string.IsNullOrEmpty(searching) ? StringConvert.ConvertShortName(p.Title.ToUpper()).Contains(StringConvert.ConvertShortName(searching.ToUpper())) : true).OrderByDescending(p => p.DateCreated).ToPagedList(pageNumber, pageSize);//lấy slug trong sql
            return View(model);
            //return View();
        }
        //public ActionResult BlogDetail(string slug)
        //{
        //    ViewBag.ReturnUrl = "BlogOverview";
        //    var model = _blogService.GetBlogByUrlName(slug);
        //    return View(model);x
        //}

        //public ActionResult Artec()
        //{
        //    ViewBag.ReturnUrl = "Artec";
        //    var model = _blogService.GetBlogByUrlName("artec");
        //    return View(model);

        //}
        
        public ActionResult DetailBlog(string slug, string ad = "")
        {
            //ViewBag.ReturnUrl = "DetailBlog";
            //var model = _blogService.GetBlogByUrlName(slug);
            //ViewBag.urlSlug = slug;
            //return View(model);

            //var slugs = Request.Url.ToString();
            ViewBag.ReturnUrl = "/tin-tuc";
            ViewBag.Slug = "/" + slug;
            ViewBag.Slug1 = "/tin-tuc"+ ViewBag.Slug+ "?ad="+ ad;
            var x = ViewBag.Slug1;
            var model = _blogService.GetBlogByUrlName(slug);
            var blogall = _blogService.GetBlogs().Where(p => p.BlogCategoryId != 15 && p.Slug != slug).OrderByDescending(p => p.DateCreated).ToList();
            ViewData["blogall"] = blogall;
            return View(model);

        }
        public ActionResult ListBlog(string slug)
        {
            //var slugs = Request.Url.ToString();
            ViewBag.ReturnUrl = "/blog-list";
            ViewBag.Slug = "/" + slug;
            
            var model = _blogService.GetBlogByUrlName(slug);
            return View(model);

        }
        //public ActionResult Listsearch(int? blog = 3, int? page = 1, string searching=null)
        //{
        //    int pageNumber = (page ?? 1);
        //    int pageSize = 5;
        //    ViewBag.ReturnUrl = "/list-search"; /*BlogList*/
        //    var model = _blogService.GetBlogs().Where(p => StringConvert.ConvertShortName(p.Title).Contains(StringConvert.ConvertShortName(searching)) || searching == null).ToList().ToPagedList(pageNumber, pageSize);//lấy slug trong sql
        //    return View(model);
        //    //return View();
        //}

    }
}