import { BrandsFilter } from "./BrandsFilter"
import { ColorFilter } from "./ColorFilter"
import { QueryFilter } from "./QueryFilter"
import { RemoveFilters } from "./RemoveFilters"
import { PriceRange } from "./PriceRange"

export const ProductsFilters = () => {
    return (
        <>
            <div className="flex items-center justify-end lg:justify-between">
                <h4 className="text-lg text-title font-medium hidden lg:block">
                    فیلتر محصولات
                </h4>
                <RemoveFilters />
            </div>
            <div className="lg:mt-5">
                <h3 className="text-title mb-3">جستجو</h3>
                <QueryFilter />
            </div>
            <hr className="border-t border-border my-5" />
            <div>
                <h3 className="text-title mb-3">انتخاب برند ها</h3>
                <BrandsFilter />
            </div>
            <hr className="border-t border-border my-5" />
            <div>
                <h3 className="text-title mb-3">انتخاب رنگ ها</h3>
                <ColorFilter />
            </div>
            <hr className="border-t border-border my-5" />
            <div>
                <h3 className="text-title mb-3">محدوده قیمت</h3>
                <PriceRange />
            </div>
        </>
    )
}
