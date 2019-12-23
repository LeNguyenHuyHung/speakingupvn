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
    public class MarkforgeController : BaseHomeController
    {
        private readonly IProductService _productService;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IBlogService _blogService;
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly IWebsiteAttributeService _websiteAttributeService;
        private readonly IStaffService _staffService;
        private readonly IProductAttributeMappingService _productAttributeMappingService;
        private readonly IProductRelationshipService _productRelationshipService;

        public MarkforgeController(IProductService productService, IBlogService blogService,
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
        // GET: /Markforge/
        public ActionResult Index()
        {
            
            var model = _blogService.GetBlogByUrlName("marforge");
            return View(model);
        }
        public ActionResult OverviewMark()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/overview";
            var model = _productService.GetProductBySlug("overview-markforged-4");
            return View(model);
        }

        public ActionResult MarkforgedPrinter()
        {
            ViewBag.ReturnUrl = "markforgedprinter";
            var model = _blogService.GetBlogByUrlName("marforge");
            return View(model);
        }

        public ActionResult Material()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/material";
            var model = _productService.GetProductBySlug("gioi-thieu-markforged-3");
            return View(model);
        }
        public ActionResult OnyxOne()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/onyxone";
            var model = _productService.GetProductBySlug("onyxone-markforge-15");
            return View(model);
        }
        public ActionResult MarkTwo()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/marktwo";
            var model = _productService.GetProductBySlug("marktwo-markforge-14");
            return View(model);
        }
        public ActionResult IndustrialX3()
        {
            return View();
        }
        public ActionResult IndustrialX5()
        {
            return View();
        }
        public ActionResult IndustrialX7()
        {
            return View();
        }
        public ActionResult MetalX()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/metalx";
            var model = _blogService.GetBlogByUrlName("markforged-metalx");
            return View(model);
        }
        //public ActionResult Sinter1OrSinter2()
        //{
        //    return View();
        //}
        public ActionResult Eiger()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/eiger";
            var model = _productService.GetProductBySlug("eiger-markforge-18");
            return View(model);
        }
        public ActionResult Movie()
        {
            ViewBag.ReturnUrl = "markforgedprinter/movie";
            var model = _productService.GetProductBySlug("video-markforged-5");
            return View(model);
        }
        public ActionResult CaseStudy()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/casestudy";
            var model = _productService.GetProductBySlug("casestudy-markforged-6");
            return View(model);
        }
        public ActionResult Tooling()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/tooling";
            var model = _productService.GetProductBySlug("tooling-markforge-19");
            return View(model);
        }
        public ActionResult ProtoTyping()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/prototyping";
            var model = _productService.GetProductBySlug("prototyping-markforge-20");
            return View(model);
        }
        public ActionResult EndUseParts()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/enduseparts";
            var model = _productService.GetProductBySlug("enduseparts-markforge-21");
            return View(model);
        }
        public ActionResult Education()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/education";
            var model = _productService.GetProductBySlug("education-markforge-22");
            return View(model);
        }
        public ActionResult Case01()
        {
            return View();
        }
        public ActionResult Case02()
        {
            ViewBag.ReturnUrl = "/Case02";
            var model = _productService.GetProductBySlug("case02-markforge-78");
            return View(model);
        }
        public ActionResult Case03()
        {
            ViewBag.ReturnUrl = "/Case03";
            var model = _productService.GetProductBySlug("case03-markforge-79");
            return View(model);
        }
        public ActionResult IndustrialSeries()
        {
            ViewBag.ReturnUrl = "/markforgedprinter/industrialseries";
            var model = _productService.GetProductBySlug("industrialseries-markforge-17");
            return View(model);
        }
    }
}