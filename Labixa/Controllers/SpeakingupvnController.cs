﻿using System;
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
    public class SpeakingupvnController : BaseHomeController
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

        public SpeakingupvnController(IProductService productService, IBlogService blogService,
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
        
        public ActionResult Index()
        {
          
            return View();
            //return View();
        }
        
    
    }
}