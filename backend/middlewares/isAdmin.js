

export const isAdmin = (req,res,next)=>{
    console.log(req.user.role,"role");
    
    if(req.user.role!=='admin'){
        console.log(req.user.role);
        
        return res.status(403).json({ message: "Access Denied. Admin only." });
    }
    next();
}