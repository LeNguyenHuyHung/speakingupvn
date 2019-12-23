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
    public class EurekaController : BaseHomeController
    {
        private readonly IProductService _productService;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IBlogService _blogService;
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly IWebsiteAttributeService _websiteAttributeService;
        private readonly IStaffService _staffService;
        private readonly IProductAttributeMappingService _productAttributeMappingService;
        private readonly IProductRelationshipService _productRelationshipService;

        public EurekaController(IProductService productService, IBlogService blogService,
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
        // GET: /Eureka/
        public ActionResult Index()
        {
            ViewBag.ReturnUrl = "eureka";
            var model = _blogService.GetBlogByUrlName("eureka");
            return View(model);
        }
        public ActionResult Overview()
        {
            ViewBag.ReturnUrl = "/eureka/overview";
            var model = _productService.GetProductBySlug("overview-eureka-60");
            return View(model);
        }
        public ActionResult Specifications()
        {
            ViewBag.ReturnUrl = "/eureka/specifications";
            var model = _productService.GetProductBySlug("specifications-eureka-58");
            return View(model);
        }
        public ActionResult CaseStudy()
        {
            ViewBag.ReturnUrl = "/eureka/caseStudy";
            var model = _productService.GetProductBySlug("casestudy-eureka-59");
            return View(model);
        }
      
    }
}